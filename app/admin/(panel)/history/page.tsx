import { listBackups } from "@/lib/content/storage";
import HistoryList from "./HistoryList";

export default async function AdminHistoryPage() {
  const backups = await listBackups();
  return <HistoryList backups={backups} />;
}
