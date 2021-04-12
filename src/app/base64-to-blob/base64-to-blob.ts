export class Base64ToBlob {
  constructor() {
  }

  public generate(base64Data, contentType, sliceSize): any {

    let byteCharacters;
    let byteArray;
    let byteNumbers;
    let blobData;
    let blob;

    contentType = contentType || '';

    byteCharacters = atob(base64Data);

    blobData = sliceSize ? getBlobDataSliced() : getBlobDataAtOnce();

    blob = new Blob(blobData, { type: contentType });

    return blob;

    function getBlobDataAtOnce(): any {
      byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      byteArray = new Uint8Array(byteNumbers);

      return [byteArray];
    }

    function getBlobDataSliced(): any {

      let slice;
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        slice = byteCharacters.slice(offset, offset + sliceSize);

        byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      return byteArrays;
    }
  }
}
