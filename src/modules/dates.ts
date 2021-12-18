import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // import plugin

dayjs.extend(relativeTime);

export const timeAgo = (timestamp: Date): String => dayjs(timestamp).fromNow();
