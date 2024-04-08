import Device from '@/types/Device';
import Firmware from '@/types/Firmware';
import Group from '@/types/Group';
import { useEffect, useState } from 'react';
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import useFetch from '@/hooks/useFetch';
import usePost from '@/hooks/usePost';
import usePut from '@/hooks/usePut';
import useDelete from '@/hooks/useDelete';

const Devices = () => {
	const [devices, setDevices] = useState<Device[]>([]);
	const [originalDevices, refetchDevices] = useFetch<Device[]>(
		'/api/Devices/GetAll'
	);
	const [firmware] = useFetch<Firmware[]>('/api/Firmware/GetAll');
	const [groups] = useFetch<Group[]>('/api/Groups/GetAll');
	const [editingDevice, setEditingDevice] = useState<Device | null>(null);
	const putDevice = usePut<Device>();
	const postDevice = usePost<Device>();
	const deleteDevice = useDelete();

	useEffect(() => {
		const enhanceDevices = async () => {
			if (!originalDevices) return;

			const enhancedDevices = await Promise.all(
				originalDevices.map(async (device) => {
					const firmwaresT = await getFirmwareById(device.firmwareId ?? 0);
					const groupsT = await getGroupById(device.groupId ?? 0);

					return {
						...device,
						firmware: firmwaresT,
						group: groupsT,
					};
				})
			);

			setDevices(enhancedDevices);
		};

		enhanceDevices();
	}, [originalDevices]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const data = {
			name: formData.get('name') as string,
			firmwareId: parseInt(formData.get('firmwareId') as string),
			groupId: parseInt(formData.get('groupId') as string),
		};

		const success = await postDevice('/api/Devices/Add', data);
		if (success) {
			refetchDevices();
		} else {
			alert('Could not add the device.');
		}
	};

	const handleEditSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const data = {
			id: editingDevice?.id,
			name: formData.get('nameEdit') as string,
			firmwareId: parseInt(formData.get('firmwareIdEdit') as string),
			groupId: parseInt(formData.get('groupIdEdit') as string),
		};
		const success = putDevice('/api/Devices/Update', data);
		Promise.resolve(success)
			.catch(() => alert('Could not update the device.'))
			.then(() => {
				refetchDevices();
				setEditingDevice(null);
			});
	};

	const handleEditOpen = (device: Device) => {
		setEditingDevice(device);
	};

	const handleDelete = async (id: number) => {
		if (window.confirm('Are you sure you want to delete this device?')) {
			const success = await deleteDevice(`/api/Devices/Delete/${id}`);

			Promise.resolve(success)
				.catch(() => alert('Could not delete the device.'))
				.then(() => refetchDevices());
		}
	};

	async function getFirmwareById(id: number) {
		const response = await fetch(`/api/Firmware/Get/${id}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		});

		const data: Firmware = await response.json();
		return data;
	}

	async function getGroupById(id: number) {
		const response = await fetch(`/api/Groups/Get/${id}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		});
		const data: Group = await response.json();
		return data;
	}

	return (
		<>
			<Dialog
				open={!!editingDevice}
				onOpenChange={(open) => {
					if (!open) {
						setEditingDevice(null); // Close the dialog by setting editingDevice to null
					}
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Device</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleEditSubmit} className="space-y-1">
						<label
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							Device Name:
							<Input
								name="nameEdit"
								type="text"
								placeholder="Device Name"
								defaultValue={(editingDevice && editingDevice.name) ?? ''}
								required
							/>
						</label>

						<label
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							Firmware:
							<Select
								name="firmwareIdEdit"
								required
								defaultValue={editingDevice?.firmwareId?.toString()}
							>
								<SelectTrigger>
									<SelectValue placeholder="Choose a firmware" />
								</SelectTrigger>
								<SelectContent>
									{firmware?.map((fw) => (
										<SelectItem
											key={fw.id}
											value={fw.id!.toString()}
											// defaultValue={
											// 	(editingDevice && editingDevice.firmwareId) ?? 0
											// }
										>
											{fw.version}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</label>

						<label
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							Group:
							<Select
								name="groupIdEdit"
								required
								defaultValue={editingDevice?.groupId?.toString()}
							>
								<SelectTrigger>
									<SelectValue placeholder="Choose a group" />
								</SelectTrigger>
								<SelectContent>
									{groups?.map((group) => (
										<SelectItem
											key={group.id}
											value={group.id!.toString()}
											defaultValue={
												(editingDevice && editingDevice.groupId) ?? 0
											}
										>
											{group.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</label>

						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								marginTop: '1rem',
							}}
						>
							<div />
							<Button type="submit">Update</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			<div className="space-y-2  p-2">
				<h1 className="text-2xl sticky top-0 bg-background">Add Device</h1>
				<form onSubmit={handleSubmit} className="space-y-2">
					<Input
						name="name"
						type="text"
						placeholder="Device Name"
						required
						className="flex flex-col w-full"
					/>

					<label className="flex flex-col w-full">
						Firmware:
						<Select name="firmwareId" required>
							<SelectTrigger>
								<SelectValue placeholder="Choose a firmware" />
							</SelectTrigger>
							<SelectContent>
								{firmware?.map((fw) => (
									<SelectItem key={fw.id} value={fw.id!.toString()}>
										{fw.version}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</label>

					<label className="flex flex-col w-full">
						Group:
						<Select name="groupId" required>
							<SelectTrigger>
								<SelectValue placeholder="Choose a group" />
							</SelectTrigger>
							<SelectContent>
								{groups?.map((group) => (
									<SelectItem key={group.id} value={group.id!.toString()}>
										{group.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</label>

					<div className="flex w-full justify-end">
						<Button type="submit" className="flex">
							Add
						</Button>
					</div>
				</form>

				<hr className="border-t border-card" />

				<h1 className="text-2xl sticky top-0 bg-background">List Devices</h1>
				<div className="overflow-hidden  border rounded-lg">
					<Table className="w-full">
						<TableHeader>
							<TableRow>
								<TableHead>ID</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Version</TableHead>
								<TableHead>Group</TableHead>
								<TableHead className="flex flex-row justify-end items-center">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{devices?.map((device) => (
								<TableRow key={device.id}>
									<TableCell>{device.id}</TableCell>
									<TableCell>{device.name}</TableCell>
									<TableCell>{device.firmware?.version}</TableCell>
									<TableCell>{device.group?.name}</TableCell>
									<TableCell className="flex justify-end items-center p-0 mt-1.5">
										<Button
											className="p-0 m-0"
											size="icon"
											variant="ghost"
											onClick={() => handleEditOpen(device)}
										>
											<Pencil1Icon />
										</Button>
										<Button
											className="p-0 m-0"
											size="icon"
											variant="ghost"
											onClick={() => handleDelete(device.id!)}
										>
											<Cross1Icon />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	);
};

export default Devices;
