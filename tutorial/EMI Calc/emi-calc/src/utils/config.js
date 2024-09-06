export function numberWithCommas(x) {
  if (x)
    return x.toString().replace(/(?<=\d)(?=(\d\d)+\d(\.\d{0,2})?$)/g, ",");
}
