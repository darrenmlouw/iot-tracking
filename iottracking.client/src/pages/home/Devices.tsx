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

const Devices = () => {
	const [devices, setDevices] = useState<Device[]>();
	const [firmware, setFirmware] = useState<Firmware[]>([]);
	const [groups, setGroups] = useState<Group[]>([]);

	const [editingDevice, setEditingDevice] = useState<Device | null>(null);

	useEffect(() => {
		getDevices();
		getFirmware();
		getGroups();
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const data = {
			name: formData.get('name') as string,
			firmwareId: parseInt(formData.get('firmwareId') as string),
			groupId: parseInt(formData.get('groupId') as string),
		};

		const response = await fetch('/api/Devices/Add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			getDevices();
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
		editDevice(data);
	};

	const handleEditOpen = (device: Device) => {
		setEditingDevice(device);
	};

	const handleDelete = async (id: number) => {
		if (window.confirm('Are you sure you want to delete this device?')) {
			const success = await deleteDevice(id);
			if (success) {
				getDevices(); // Refresh the list
			} else {
				alert('Could not delete the device.');
			}
		}
	};

	async function getDevices() {
		const response = await fetch('/api/Devices/GetAll', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		});
		const devices = await response.json();

		// Use Promise.all to wait for all devices to be enhanced with their firmware and group
		const enhancedDevices = await Promise.all(
			devices.map(async (device: Device) => {
				// Get firmware and group details for each device
				const firmware = await getFirmwareById(device.firmwareId ?? 0);
				const group = await getGroupById(device.groupId ?? 0);

				// Return a new object representing the enhanced device
				return {
					...device,
					firmware: firmware,
					group: group,
				};
			})
		);

		setDevices(enhancedDevices);
	}

	async function getFirmware() {
		const response = await fetch('/api/Firmware/GetAll', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		});

		const data = await response.json();
		setFirmware(data);
	}

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

	async function getGroups() {
		const response = await fetch('/api/Groups/GetAll', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		});
		const data = await response.json();
		setGroups(data);
	}

	const editDevice = async (deviceData: Device) => {
		const response = await fetch(`/api/Devices/Update`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(deviceData),
		});
		if (response.ok) {
			getDevices(); // Refresh the list of devices
			setEditingDevice(null); // Close the dialog
		} else {
			alert('Could not update the device.');
		}
	};

	async function deleteDevice(id: number) {
		const response = await fetch(
			`https://localhost:7253/api/Devices/Delete/${id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return response.ok;
	}

	// function organizeGroups(groups: Group[]) {
	// 	// Create a map to hold groups by their ID for quick access
	// 	const groupMap = new Map(
	// 		groups.map((group) => [group.id, { ...group, children: [] }])
	// 	);

	// 	// Placeholder for root groups
	// 	const rootGroups: Group[] = [];

	// 	// Populate children array and identify root groups
	// 	groupMap.forEach((group) => {
	// 		if (group.parentGroupId) {
	// 			const parent = groupMap.get(group.parentGroupId);
	// 			parent.children.push(group);
	// 		} else {
	// 			rootGroups.push(group);
	// 		}
	// 	});

	// 	return rootGroups;
	// }

	// function renderGroupsWithSubgroups(groupList: Group[]) {
	// 	return groupList.map((group) => (
	// 		<SelectGroup key={group.id}>
	// 			<SelectLabel>{group.name}</SelectLabel>
	// 			{group.children.length > 0 ? (
	// 				renderGroupsWithSubgroups(group.children)
	// 			) : (
	// 				<SelectItem value={group.id.toString()}>{group.name}</SelectItem>
	// 			)}
	// 		</SelectGroup>
	// 	));
	// }

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
