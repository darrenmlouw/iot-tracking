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

const Groups = () => {
	const [groups, setGroups] = useState<Group[]>([]);

	const [editingGroup, setEditingGroup] = useState<Group | null>(null);

	useEffect(() => {
		getGroups();
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const data = {
			name: formData.get('name') as string,
			ParentGroupId: parseInt(formData.get('parentGroupId') as string),
		};

		const response = await fetch('/api/Groups/Add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			getGroups();
		}
	};

	const handleEditSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const data = {
			id: editingGroup?.id,
			name: formData.get('nameEdit') as string,
			parentGroupId: parseInt(formData.get('parentGroupIdEdit') as string),
		};
		editGroup(data);
	};

	const handleEditOpen = (group: Group) => {
		setEditingGroup(group);
	};

	const handleDelete = async (id: number) => {
		if (window.confirm('Are you sure you want to delete this group?')) {
			const success = await deleteGroup(id);
			if (success) {
				getGroups(); // Refresh the list
			} else {
				alert('Could not delete the group.');
			}
		}
	};


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

		const enhancedGroups = await Promise.all(
			data.map(async (group: Group) => {
				const parentGroup = await getGroupById(group.parentGroupId!);
				return { ...group, parentGroup };
			})
		);

		setGroups(enhancedGroups);
	}

	const editGroup = async (groupData: Group) => {
		const response = await fetch(`/api/Groups/Update`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(groupData),
		});
		if (response.ok) {
			getGroups(); // Refresh the list of devices
			setEditingGroup(null); // Close the dialog
		} else {
			alert('Could not update the group.');
		}
	};

	async function deleteGroup(id: number) {
		const response = await fetch(
			`/api/Groups/Delete/${id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return response.ok;
	}

	return (
		<>
			<Dialog
				open={!!editingGroup}
				onOpenChange={(open) => {
					if (!open) {
						setEditingGroup(null); // Close the dialog by setting editingDevice to null
					}
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Group</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleEditSubmit} className="space-y-1">
						<label
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							Group Name:
							<Input
								name="nameEdit"
								type="text"
								placeholder="Group Name"
								defaultValue={(editingGroup && editingGroup.name) ?? ''}
								required
							/>
						</label>

						<label
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							Group:
							<Select
								name="parentGroupIdEdit"
								defaultValue={editingGroup?.parentGroupId?.toString()}
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
												(editingGroup && editingGroup.parentGroupId) ?? 0
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
				<h1 className="text-2xl sticky top-0 bg-background">Add Group</h1>
				<form onSubmit={handleSubmit} className="space-y-2">
					<Input
						name="name"
						type="text"
						placeholder="Group Name"
						required
						className="flex flex-col w-full"
					/>

					<label className="flex flex-col w-full">
						Group:
						<Select name="parentGroupId">
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
								<TableHead>Parent Group</TableHead>
								<TableHead className="flex flex-row justify-end items-center">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{groups?.map((group) => (
								<TableRow key={group.id}>
									<TableCell>{group.id}</TableCell>
									<TableCell>{group.name}</TableCell>
									<TableCell>{group.parentGroup?.name}</TableCell>
									<TableCell className="flex justify-end items-center p-0 mt-1.5">
										<Button
											className="p-0 m-0"
											size="icon"
											variant="ghost"
											onClick={() => handleEditOpen(group)}
										>
											<Pencil1Icon />
										</Button>
										<Button
											className="p-0 m-0"
											size="icon"
											variant="ghost"
											onClick={() => handleDelete(group.id!)}
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

export default Groups;
