import { Activity } from "./Activity";

export interface Quest {
    id: string
    title: string
    openActivities: Activity[]
}
