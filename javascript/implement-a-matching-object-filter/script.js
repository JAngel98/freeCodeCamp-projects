function whatIsInAName(arrObjs, srcObj) {
  const srcKeys = Object.keys(srcObj);

  return arrObjs.filter(obj => 
    srcKeys.every(key => obj.hasOwnProperty(key) && obj[key] === srcObj[key])
  );
}