const getNameOfDay = (e) => {
  const weekday = new Array(7);
  weekday[0] = "Minggu";
  weekday[1] = "Senin";
  weekday[2] = "Selasa";
  weekday[3] = "Rabu";
  weekday[4] = "Kamis";
  weekday[5] = "Jumat";
  weekday[6] = "Minggu";

  return e.map((_) => weekday[_].toUpperCase());
};

module.exports = getNameOfDay;
