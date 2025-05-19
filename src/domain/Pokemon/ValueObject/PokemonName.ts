export interface PokemonName {
    readonly value: string;
}

export const $PokemonName = {
    create: (value: string): PokemonName => {
        // バリデーションなど必要ならここでチェック
        if (!value || value.length === 0) throw new Error("名前が空です");
        return { value };
    },
};
