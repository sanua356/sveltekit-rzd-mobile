export class IndexedDBLibrary {
	databaseName: string;
	collectionName: string;
	version = 1;

	constructor(databaseName: string, collectionName: string) {
		this.databaseName = databaseName;
		this.collectionName = collectionName;
	}

	init() {
		return new Promise((resolve, reject) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let connection: any = null;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const onError = (err: any) => {
				reject(err);
			};
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const onUpgrade = (event: any) => {
				const db = event.target.result;
				if (!db.objectStoreNames.contains(this.collectionName)) {
					db.createObjectStore(this.collectionName, { keyPath: 'id', autoIncrement: true });
				}
			};

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const onSuccess = (event: any) => {
				const db = event.target.result;
				if (!db.objectStoreNames.contains(this.collectionName)) {
					this.version = this.version + 1;
					connection.result.close();
					const connect = indexedDB.open(this.databaseName, this.version);
					connect.onerror = onError;
					connect.onupgradeneeded = onUpgrade;
					connect.onsuccess = onSuccess;
				} else {
					resolve(db);
				}
			};

			try {
				indexedDB
					.databases()
					.then((dbs) => {
						const db = dbs.find((db) => db.name === this.databaseName);
						if (db) {
							this.version = db.version || 1;
						} else {
							this.version = 1;
						}
						connection = indexedDB.open(this.databaseName, this.version);
						connection.onerror = onError;
						connection.onsuccess = onSuccess;
						connection.onupgradeneeded = onUpgrade;
					})
					.catch((err) => {
						reject(err);
					});
			} catch (error) {
				reject(error);
			}
		});
	}

	read(
		searchId?: number | undefined,
		typeResult: 'only' | 'lowerBound' | 'upperBound' = 'only'
	): Promise<unknown> {
		return new Promise((resolve, reject) => {
			try {
				this.init()
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					.then((db: any) => {
						const transaction = db.transaction(this.collectionName, 'readonly');
						const objectStore = transaction.objectStore(this.collectionName);
						if (!searchId) {
							const result = objectStore.getAll();
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							result.onsuccess = (data: any) => {
								resolve(data.target.result);
							};
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							result.onerror = (err: any) => {
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
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								result.onerror = (err: any) => {
									reject(err);
								};
							}
						}
					})
					.catch((err) => {
						reject(err);
					});
			} catch (error) {
				reject(error);
			}
		});
	}

	write(value: unknown): Promise<unknown> {
		return new Promise((resolve, reject) => {
			try {
				this.init()
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					.then((db: any) => {
						const transaction = db.transaction(this.collectionName, 'readwrite');
						const objectStore = transaction.objectStore(this.collectionName);
						objectStore.add(value);
						transaction.oncomplete = () => {
							resolve(true);
						};
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						transaction.onerror = (err: any) => {
							reject(err);
						};
					})
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					.catch((err: any) => {
						reject(err);
					});
			} catch (error) {
				reject(error);
			}
		});
	}

	delete(deleteId: number): Promise<unknown> {
		return new Promise((resolve, reject) => {
			try {
				this.init()
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					.then((db: any) => {
						const transaction = db.transaction(this.collectionName, 'readwrite');
						const objectStore = transaction.objectStore(this.collectionName);
						objectStore.delete(deleteId);
						transaction.oncomplete = () => {
							resolve(true);
						};
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						transaction.onerror = (err: any) => {
							reject(err);
						};
					})
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					.catch((err: any) => {
						reject(err);
					});
			} catch (error) {
				reject(error);
			}
		});
	}
}
