export interface Pokemon {
    readonly name: string;
    readonly url: string;
    readonly id: number;
    readonly imageUrl: string;
}

export const $Pokemon = {
    create: (params: { name: string; url: string }): Pokemon => {
        const { name, url } = params;
        const parts = url.split("/");
        const id = Number(parts[parts.length - 2]);

        return {
            name,
            url,
            id,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
    },
};
