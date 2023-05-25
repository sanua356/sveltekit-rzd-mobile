export class IndexedDBLibrary {
	databaseName: string;
	collectionName: string;
	stream: IDBOpenDBRequest;

	constructor(databaseName: string, collectionName: string) {
		this.databaseName = databaseName;
		this.stream = indexedDB.open(this.databaseName, 1);
		this.collectionName = collectionName;

		this.stream.onerror = (err) => {
			throw new Error('indexed db error' + err.type);
		};
		this.stream.onupgradeneeded = () => {
			const db = this.stream.result;
			if (!db.objectStoreNames.contains(collectionName)) {
				db.createObjectStore(collectionName, { keyPath: 'id', autoIncrement: true });
			}
		};
	}

	read(
		searchId?: number | undefined,
		typeResult: 'only' | 'lowerBound' | 'upperBound' = 'only'
	): Promise<unknown> {
		return new Promise((resolve, reject) => {
			try {
				const connection = indexedDB.open(this.databaseName, 1);
				connection.onerror = (err) => {
					reject(err);
				};
				connection.onsuccess = () => {
					const db = connection.result;
					const transaction = db.transaction(this.collectionName, 'readonly');
					const objectStore = transaction.objectStore(this.collectionName);
					if (!searchId) {
						const result = objectStore.getAll();
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						result.onsuccess = (data: any) => {
							resolve(data.target.result);
						};
						result.onerror = (err) => {
							reject(err);
						};
					} else {
						let result = null;
						switch (typeResult) {
							case 'only':
								result = objectStore.getAll(IDBKeyRange.only(searchId));
								break;
							case 'lowerBound':
								result = objectStore.getAll(IDBKeyRange.lowerBound(searchId));
								break;
							case 'upperBound':
								result = objectStore.getAll(IDBKeyRange.upperBound(searchId));
								break;
							default:
								break;
						}
						if (result) {
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							result.onsuccess = (data: any) => {
								resolve(data.target.result);
							};
							result.onerror = (err) => {
								reject(err);
							};
						}
					}
				};
			} catch (error) {
				reject(error);
			}
		});
	}

	write(value: unknown): Promise<unknown> {
		return new Promise((resolve, reject) => {
			try {
				const connection = indexedDB.open(this.databaseName, 1);
				connection.onerror = (err) => {
					reject(err);
				};
				connection.onsuccess = () => {
					const db = connection.result;
					const transaction = db.transaction(this.collectionName, 'readwrite');
					const objectStore = transaction.objectStore(this.collectionName);
					objectStore.add(value);
					transaction.oncomplete = () => {
						resolve(true);
					};
					transaction.onerror = (err) => {
						reject(err);
					};
				};
			} catch (error) {
				reject(error);
			}
		});
	}

	delete(deleteId: number): Promise<unknown> {
		return new Promise((resolve, reject) => {
			try {
				const connection = indexedDB.open(this.databaseName, 1);
				connection.onerror = (err) => {
					reject(err);
				};
				connection.onsuccess = () => {
					const db = connection.result;
					const transaction = db.transaction(this.collectionName, 'readwrite');
					const objectStore = transaction.objectStore(this.collectionName);
					objectStore.delete(deleteId);
					transaction.oncomplete = () => {
						resolve(true);
					};
					transaction.onerror = (err) => {
						reject(err);
					};
				};
			} catch (error) {
				reject(error);
			}
		});
	}
}
