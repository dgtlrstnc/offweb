// https://github.com/mutaphysis/smackmyglitchupjs/blob/master/glitch.html

var base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var base64Map = base64Chars.split('');
var reverseBase64Map = {};
base64Map.forEach(function(val, key) { reverseBase64Map[val] = key} );

class GlitchPass extends Entity {
  render(ctx, dt, ms) {
    var p = (ms/3000)%1;
    if (p < 0.1) {
      p = modulate(p, 0, 1, 0, 0.1);
      var img = this.img;
      var imgData = ctx.canvas.toDataURL('image/jpeg', 50);
      var imgDataArr = this.base64ToByteArray(imgData);
      this.detectJpegHeaderSize(imgDataArr);
      this.glitchJpeg(imgDataArr, p*100);
      if (this.img) {
        try {
          ctx.drawImage(img, 0, 0);
        } catch (e) {}
      }
    }
  }

  detectJpegHeaderSize(data) {
    this.jpgHeaderLength = 417;
    for (var i = 0, l = data.length; i < l; i++) {
      if (data[i] == 0xFF && data[i+1] == 0xDA) {
        this.jpgHeaderLength = i + 2; return;
      }
    }
  }

  // base64 is 2^6, byte is 2^8, every 4 base64 values create three bytes
  base64ToByteArray(str) {
    var result = [], digitNum, cur, prev;
    for (var i = 23, l = str.length; i < l; i++) {
      cur = reverseBase64Map[str.charAt(i)];
      digitNum = (i-23) % 4;
      switch(digitNum){
        //case 0: first digit - do nothing, not enough info to work with
        case 1: //second digit
          result.push(prev << 2 | cur >> 4);
          break;
        case 2: //third digit
          result.push((prev & 0x0f) << 4 | cur >> 2);
          break;
        case 3: //fourth digit
          result.push((prev & 3) << 6 | cur);
          break;
      }
      prev = cur;
    }
    return result;
  }

  byteArrayToBase64(arr) {
   var result = ['data:image/jpeg;base64,'], byteNum, cur, prev;
    for (var i = 0, l = arr.length; i < l; i++) {
      cur = arr[i];
      byteNum = i % 3;
      switch (byteNum) {
        case 0: //first byte
          result.push(base64Map[cur >> 2]);
          break;
        case 1: //second byte
          result.push(base64Map[(prev & 3) << 4 | (cur >> 4)]);
          break;
        case 2: //third byte
          result.push(base64Map[(prev & 0x0f) << 2 | (cur >> 6)]);
          result.push(base64Map[cur & 0x3f]);
          break;
      }
      prev = cur;
    }
    if (byteNum == 0) {
      result.push(base64Map[(prev & 3) << 4]);
      result.push('==');
    } else if (byteNum == 1) {
      result.push(base64Map[(prev & 0x0f) << 2]);
      result.push('=');
    }
    return result.join('');
  }

  glitchJpegBytes(strArr, seed, amount, iterationCount) {
    const headerLength = this.jpgHeaderLength;
  	const maxIndex = strArr.length - headerLength - 4;

  	const amountPercent = amount / 100;
  	const seedPercent   = seed / 100;

  	for ( var iterationIndex = 0; iterationIndex < iterationCount; iterationIndex++ ) {
  		const minPixelIndex = ( maxIndex / iterationCount * iterationIndex ) | 0;
  		const maxPixelIndex = ( maxIndex / iterationCount * ( iterationIndex + 1 ) ) | 0;

  		const delta = maxPixelIndex - minPixelIndex;
  		let pixelIndex = ( minPixelIndex + delta * seedPercent ) | 0;

  		if ( pixelIndex > maxIndex ) {
  			pixelIndex = maxIndex;
  		}

  		const indexInByteArray = ~~( headerLength + pixelIndex );

  		strArr[indexInByteArray] = ~~( amountPercent * 256 );
  	}
  }

  glitchJpeg(imgDataArr, off) {
    var glitchCopy = imgDataArr.slice();
    this.glitchJpegBytes(glitchCopy, off, 5+rand()*5, floor(rand()*4));
    this.img = new Image();
    this.img.src = this.byteArrayToBase64(glitchCopy);
  }}
