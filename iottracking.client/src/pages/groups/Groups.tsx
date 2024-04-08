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
import usePut from '@/hooks/usePut';
import usePost from '@/hooks/usePost';
import useDelete from '@/hooks/useDelete';

const Groups = () => {
	const [groups, setGroups] = useState<Group[]>([]);
	const [originalGroups, refetchGroups] =
		useFetch<Group[]>('/api/Groups/GetAll');
	const [editingGroup, setEditingGroup] = useState<Group | null>(null);
	const _put = usePut<Group>();
	const _post = usePost<Group>();
	const _delete = useDelete();

	useEffect(() => {
		const enhanceGroups = async () => {
			if (!originalGroups) return;

			const enhancedGroups = await Promise.all(
				originalGroups.map(async (group) => {
					const parentGroup = await getGroupById(group.parentGroupId ?? 0);

					return { ...group, parentGroup };
				})
			);
			setGroups(enhancedGroups);
		};

		enhanceGroups();
	}, [originalGroups]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const data = {
			name: formData.get('name') as string,
			ParentGroupId: parseInt(formData.get('parentGroupId') as string),
		};

		const success = await _post('/api/Groups/Add', data);
		if (success) {
			refetchGroups();
		} else {
			alert('Could not add the group.');
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

		const success = _put('/api/Groups/Update', data);
		Promise.resolve(success)
			.catch(() => {
				alert('Could not update the group.');
			})
			.then(() => {
				refetchGroups();
				setEditingGroup(null);
			});
	};

	const handleEditOpen = (group: Group) => {
		setEditingGroup(group);
	};

	const handleDelete = async (id: number) => {
		if (window.confirm('Are you sure you want to delete this group?')) {
			const success = await _delete(`/api/Groups/Delete/${id}`);

			Promise.resolve(success)
				.catch(() => {
					alert('Could not delete the group.');
				})
				.then(() => {
					refetchGroups();
				});
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

	return (
		<>
			<Dialog
				open={!!editingGroup}
				onOpenChange={(open) => {
					if (!open) {
						setEditingGroup(null);
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
