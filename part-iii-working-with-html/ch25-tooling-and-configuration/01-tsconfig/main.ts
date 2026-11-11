interface ProjectSettings {
  name: string;
  strict: boolean;
  include: string[];
}

const settings: ProjectSettings = {
  name: "training",
  strict: true,
  include: ["ch*/**/*.ts"],
};

console.log(`${settings.name}: strict ${settings.strict ? "on" : "off"}, ${settings.include.length} pattern`);
