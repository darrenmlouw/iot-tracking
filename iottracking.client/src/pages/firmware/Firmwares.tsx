import Firmware from '@/types/Firmware';
import { useEffect, useState } from 'react';
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';
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

const Firmwares = () => {
	const [firmware, setFirmware] = useState<Firmware[]>([]);

	const [editingFirmware, setEditingFirmware] = useState<Firmware | null>(null);

	useEffect(() => {
		getFirmware();
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const data = {
			version: formData.get('version') as string,
		};

		const response = await fetch('/api/Firmware/Add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			getFirmware();
		}
	};

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

	const handleEditSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const data = {
			id: editingFirmware?.id,
			version: formData.get('versionEdit') as string,
		};
		editFirmware(data);
	};

	const handleEditOpen = (firmware: Firmware) => {
		setEditingFirmware(firmware);
	};

	const handleDelete = async (id: number) => {
		if (window.confirm('Are you sure you want to delete this firmware?')) {
			const success = await deleteFirmware(id);
			if (success) {
				getFirmware(); // Refresh the list
			} else {
				alert('Could not delete the firmware.');
			}
		}
	};

	async function deleteFirmware(id: number) {
		const response = await fetch(
			`/api/Firmware/Delete/${id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return response.ok;
	}

	const editFirmware = async (firmwareData: Firmware) => {
		const response = await fetch(`/api/Firmware/Update`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(firmwareData),
		});
		if (response.ok) {
			getFirmware();
			setEditingFirmware(null);
		} else {
			alert('Could not update the firmware.');
		}
	};

	return (
		<>
			<Dialog
				open={!!editingFirmware}
				onOpenChange={(open) => {
					if (!open) {
						setEditingFirmware(null);
					}
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Firmware</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleEditSubmit} className="space-y-1">
						<label
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							Version:
							<Input
								name="versionEdit"
								type="text"
								placeholder="Version"
								defaultValue={
									(editingFirmware && editingFirmware.version) ?? ''
								}
								required
							/>
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

			<div className="space-y-2 p-2">
				<h1 className="text-2xl sticky top-0 bg-background">Version</h1>
				<form onSubmit={handleSubmit} className="space-y-2">
					<Input
						name="version"
						type="text"
						placeholder="Version"
						required
						className="flex flex-col w-full"
					/>
					<div className="flex w-full justify-end">
						<Button type="submit" className="flex">
							Add
						</Button>
					</div>
				</form>

				<hr className="border-t border-card" />

				<h1 className="text-2xl sticky top-0 bg-background">List Firmware</h1>
				<div className="overflow-hidden  border rounded-lg">
					<Table className="w-full">
						<TableHeader>
							<TableRow>
								<TableHead>ID</TableHead>
								<TableHead>Version</TableHead>
								<TableHead className="flex flex-row justify-end items-center">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{firmware?.map((firmware) => (
								<TableRow key={firmware.id}>
									<TableCell>{firmware.id}</TableCell>
									<TableCell>{firmware.version}</TableCell>
									<TableCell className="flex justify-end items-center p-0 mt-1.5">
										<Button
											className="p-0 m-0"
											size="icon"
											variant="ghost"
											onClick={() => handleEditOpen(firmware)}
										>
											<Pencil1Icon />
										</Button>
										<Button
											className="p-0 m-0"
											size="icon"
											variant="ghost"
											onClick={() => handleDelete(firmware.id!)}
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

export default Firmwares;
