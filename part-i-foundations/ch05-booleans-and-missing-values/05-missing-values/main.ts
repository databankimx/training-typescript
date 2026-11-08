const middleName: string | undefined = undefined;
const age: number | null = null;
const profile: { city?: string } = {};

console.log(middleName ?? "none");
console.log(age ?? 0);
console.log(profile.city?.toUpperCase() ?? "unknown");
