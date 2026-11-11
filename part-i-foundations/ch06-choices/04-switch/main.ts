const day: string = "Sat";

switch (day) {
  case "Sat":
  case "Sun":
    console.log("weekend");
    break;
  case "Mon":
    console.log("start of the week");
    break;
  default:
    console.log("weekday");
}
