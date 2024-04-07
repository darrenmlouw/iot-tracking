interface Group {
	id?: number;
	name?: string;
	parentGroupId?: number;
	parentGroup?: Group;
}

export default Group;