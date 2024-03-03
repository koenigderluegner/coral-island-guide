import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LatestChangelog } from "./latest-changelog.type";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ChangelogService {

    #http = inject(HttpClient);
    readonly #CHANGELOG_LOCAL_STORAGE_KEY = 'latest-changelogs'

    getLatestChangelog(): Observable<LatestChangelog> {
        return this.#http.get<LatestChangelog>('/assets/latest-changelog.md')
    }

    setLatestSeen(latestChangelog: LatestChangelog): void {
        localStorage.setItem(this.#CHANGELOG_LOCAL_STORAGE_KEY, JSON.stringify({version: latestChangelog.version}))
    }

    getLatestSeen(): string | null {
        const latestChangelogData = localStorage.getItem(this.#CHANGELOG_LOCAL_STORAGE_KEY);
        if (!latestChangelogData) return null;

        return JSON.parse(latestChangelogData).version;
    }
}
