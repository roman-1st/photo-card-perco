interface LocalStorageData<T> {
    key: string;
    value: T;
}

class localStorageManager {
    static getItem<T>(key: string): LocalStorageData<T> | null {
        let value = null;

        if (typeof window !== "undefined") {
            value = localStorage.getItem(key);
        }
        if (value) {
            try {
                const parsedValue = JSON.parse(value) as T;
                return { key, value: parsedValue };
            } catch (error) {
                console.error(`Error parsing local storage item with key "${key}":`, error);
            }
        }
        return null;
    }

    static setItem<T>(key: string, value: T): void {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error setting local storage item with key "${key}":`, error);
        }
    }

    static removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}

export default localStorageManager;
