// A mapped type loops over the keys of T. Each property of the new type gets the type `boolean`.
type Flags<T> = { [K in keyof T]: boolean };

interface Settings {
  darkMode: number;
  language: string;
}

// The checker requires a flag for each setting. Adding a setting later updates this type automatically.
const flags: Flags<Settings> = { darkMode: true, language: false };

console.log(flags.darkMode, flags.language);
