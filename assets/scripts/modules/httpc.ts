export const httpc = {
    get: async (url: string, func: (err: boolean, response: string) => void) => {
        try {
            console.log(url);

            const response = await fetch(url);
            const text = await response.text();

            const err = !response.ok;
            console.log(func);
            func(err, text);
        } catch (error) {
            console.error("Error during fetch:", error);
            func(true, error.toString());
        }
    }
};
