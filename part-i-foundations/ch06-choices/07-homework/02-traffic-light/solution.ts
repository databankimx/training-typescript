const light: string = "amber";

switch (light) {
  case "red":
    console.log("Stop");
    break;
  case "amber":
    console.log("Get ready");
    break;
  case "green":
    console.log("Go");
    break;
  default:
    console.log("Unknown light");
}
