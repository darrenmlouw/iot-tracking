import Firmware from "./Firmware";
import Group from "./Group";

interface Device {
		id?: number;
		name?: string;
		firmwareId?: number;
		firmware?: Firmware;
		groupId?: number;
		group?: Group;
}

export default Device;