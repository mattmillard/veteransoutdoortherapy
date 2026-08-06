import type { Metadata } from "next";
import { ApplicationHub } from "@/components/application-hub";
export const metadata: Metadata = { title: "Applications" };
export default function ApplicationPage() { return <ApplicationHub />; }