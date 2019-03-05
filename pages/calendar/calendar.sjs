var bImg;
var typeColor = function (type) {
  switch (type) {
    case 0:
      bImg = '';
      return bImg;
      break;
    case 1: ;
      bImg = ''
      return bImg;
      break;
    case 2:
      bImg = '../../image/special_day_03.png';
      return bImg;
      break;
    case 3:
      bImg = '../../image/signin_03.png';
      return bImg;
      break;
    case 4:
      bImg = '../../image/signin_06.png';
      return bImg;
      break;

  }

};
export default {
  typeColor: typeColor,
  bImg: bImg
};
