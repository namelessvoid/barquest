import { Drivers, Storage } from '@ionic/storage';

const storage = new Storage({
    driverOrder: [Drivers.LocalStorage, Drivers.IndexedDB]
});

export const getStorage = async () => {
    await storage.create()
    return storage;
}