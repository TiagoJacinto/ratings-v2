import fs from "fs-extra";
import path from "node:path";

import { featuresBasePath } from "../src/utils";

const targetDir = process.argv[2];
if (!targetDir)
	throw new Error("Make sure to provide a target directory argument");

void symlinkAllFiles(featuresBasePath, targetDir);

async function symlinkAllFiles(sourceDir: string, targetDir: string) {
	try {
		await fs.ensureDir(targetDir);

		const files = await fs.readdir(sourceDir);

		for (const file of files) {
			const sourcePath = path.join(sourceDir, file);
			const targetPath = path.join(targetDir, file);

			const stats = await fs.lstat(sourcePath);

			if (stats.isFile()) {
				await fs.ensureSymlink(sourcePath, targetPath, "file");
				console.log(`Symlinked: ${sourcePath} -> ${targetPath}`);
			} else if (stats.isDirectory()) {
				await fs.ensureSymlink(sourcePath, targetPath, "dir");
				console.log(`Symlinked directory: ${sourcePath} -> ${targetPath}`);
			}
		}
	} catch (err) {
		console.error(`Error processing directories:`, err);
	}
}
