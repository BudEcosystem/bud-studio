import Store from 'electron-store';

/**
 * Interface for electron-store configuration options.
 */
interface StoreOptions {
    encryptionKey?: string;
}

/**
 * Interface for electron-store instances.
 */
interface StoreInstance<T> {
    /**
     * Retrieve the value associated with a given key.
     *
     * @param key - The key to retrieve.
     * @returns The value associated with the given key.
     */
    get(key: string): T;

    /**
     * Set the value associated with a given key.
     *
     * @param key - The key to set.
     * @param value - The value to associate with the key.
     */
    set(key: string, value: T): void;
}

// Initialize a new instance of electron-store with a secret key
const store: StoreInstance<any> = new Store({ encryptionKey: 'my-encryption-key' });

/**
 * Store a secret value in the electron-store instance.
 *
 * @param key - The key to associate with the secret value.
 * @param value - The secret value to store.
 */
const storeSecret = (key: string, value: any): void => {
    // Store the secret in encrypted form
    store.set(key, value);
}

/**
 * Retrieve a secret value from the electron-store instance.
 *
 * @param key - The key associated with the secret value.
 * @returns The decrypted secret value associated with the given key.
 */
const retrieveSecret = (key: string): any => {
    // Retrieve the secret and decrypt it
    const value: any = store.get(key);
    return value;
}

export { storeSecret, retrieveSecret };

// // Store a secret
// storeSecret('google-credentials', { username: 'my-username', password: 'my-password' });

// // Retrieve a secret
// const credentials = retrieveSecret('google-credentials');
// console.log(`My Google credentials: ${JSON.stringify(credentials)}`);
