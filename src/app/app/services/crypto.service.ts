import { Injectable } from '@angular/core';

import * as crypto from 'crypto';

import * as forge from 'node-forge';


@Injectable({
  providedIn: 'root',
})
export class CryptoService {

  constructor() {
  }

  async encryptKey(value, aes, hmac) {
    try {
      const aesK = aes;
      const hmacK = hmac;
      const rest = value;
      return await this.encryptAes(rest, aesK, hmacK);
    } catch (e) {
      // console.log('encryptKey: error: ', e);
      return '';
    }
  };

  async decryptKey(value: string, aes: string, hmac: string) {
    try {
      const aesK = aes;
      const hmacK = hmac;
      const rest = value;
      return await this.decryptAes(rest, aesK, hmacK);
    } catch (e) {
      // console.log('decryptKey: error: ', e);
      return '';
    }
  }

  async encryptRSA(value, privateKey) {
    try {
      const key = '-----BEGIN PUBLIC KEY-----\n' + privateKey + '\n-----END PUBLIC KEY-----';
      let encryptBuff = crypto.publicEncrypt(
        {
          key,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(value),
      );
      return encryptBuff.toString('base64');
    } catch (e) {
      // console.log('encryptRSA: error: ', e);
      return '';
    }
  };

  async decryptRSA(value, privateKey) {
    try {
      const key = '-----BEGIN PRIVATE KEY-----\n' + privateKey + '\n-----END PRIVATE KEY-----';
      const paddingValue = crypto.constants.RSA_PKCS1_PADDING;
      const paddingValue2 = crypto.constants.RSA_PKCS1_OAEP_PADDING;

      // @ts-ignore
      const msg = new Buffer.from(value, 'base64');
      return crypto.privateDecrypt({key, padding: paddingValue}, msg).toString();
    } catch (e) {
      // console.log('decryptRSA: error: ', e);
      return '';
    }
  };

  /*var encrypted = publicKey.encrypt(bytes, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha1.create()
    }
  });

// decrypt data with a private key using RSAES-OAEP/SHA-256/MGF1-SHA-1
// compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
  var decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha1.create()
    }
  }); */

  /*async  demonstrateKeyBasedAsymmetricEncryption()  {
    try {
      // replace with yout actual String
      let exampleString =
        "Text that is going to be sent over an insecure channel and must be encrypted at all costs!";
      // generate Keypair, in asynchronous encryption both keys need to be related
      // and cannot be independently generated keys
      // keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
      let keypair = forge.generateKeyPair({ bits: 3072, e: 0x10001 });

      // ENCRYPT String
      let toEncrypt = Buffer.from(exampleString);
      let encrypted = forge.util.encode64(
        keypair.publicKey.encrypt(toEncrypt, "RSA-OAEP")
      );

      // DECRYPT String
      let decrypted = keypair.privateKey.decrypt(
        forge.util.decode64(encrypted),
        "RSA-OAEP"
      );

      console.log(
        "Decrypted String and original String are the same: %s",
        exampleString.localeCompare(decrypted) === 0 ? "yes" : "no"
      );
    } catch (error) {
      console.log(error.message);
    }
  };*/

  /*async encrypt() {
    const ASYMMETRIC_OPTIONS = {
      md: forge.md.sha256.create(),
      mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
    };
    const ASYMMETRIC_OPTIONS2 = {
      md: forge.md.sha512.create(),
      mgf1: forge.mgf.mgf1.create(forge.md.sha256.create()),
    };
    try {
      const pubKey = `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnkKOsx11+j3xeCO0haPmqK/HdHl9mex3+bdl7whmdztVtgPd5LXVODL+V2hRrURPx83kOnHUUPbFc5QBSQkLSIpoisvCNDyh/RX4tfnMnAS7dUBLE5PQhQQ8LjV/9kosZP/0u61yuCMeH8bmuW8agdClTzNHR7Ok8bdZWvz2P2MzjBNLfmP3RmPp7ego9SFCDaltkw3vqHI9FH8aIqHW1VkvTUQ0FxLUM5GgWkf1fBozSDSmplTzpqQg9vF0QQpSr6+k28htONpKXdHFEMK+rRO8k/+3w01v0dnwoov4qC9ZDhXcvQdKzqFiGXd8eJSn6oQf5LJn5M5VKAxfB8vdWwIDAQAB\n-----END PUBLIC KEY-----`;
      const publicKey = forge.pki.publicKeyFromPem(pubKey);

      const priKey = '-----BEGIN RSA PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCFASnCFt+U1ttdDlyRgq55Tdg8y6FFmtZ7CtlSLsnrJBnT5m+8qB8A+culoDUyY0DDmU/ZWvPyuEl0AFQAgnIXMLGOJ0GB3++NxFp1cOJ30MXfQJ7Wwvd1/FwD6M+N8OGq4kjKKgsQEzwO8I8wYsiXUZzNFVzAx9SI/rTIiJ6VSWldfWzTNPecSRf4TTlVwu7B079CnQ/cAB8b5HjKT6X6X2ojx5ixbB8SRMR2TXxd+IAzE5+5SRWaCoXda+vQ9kRbfes9q4sh/tOEnY2d1Ol4eZPv8dGnVNyGYqeOlJSV0MdmClnjzCnuy+RGAbNQsdWN/YT8G5GUj/pe+ER03t4LAgMBAAECggEAWwkNxOwVAnIBWXMwBuS0eRDAFfSmoNa3QSaO0wJ1cD2YdAJArpdACVHwgp/iaWen93ljPvlTCen7VKu401R1tMu+a/cQjk1xUM55v/KQ/8Nk/EblsUdnS1l8vaxHC/c47tbNTZpzUgBoVi1vRIYImBHjSjf58XWVUmNL6AoiyTimdcRAauq0aG0dsA7oE1uONZrRXWHa/YIxu+xOzEiVQrxCfodDO1rcKqjBYfw3DI8309Nykngzk43DkLa0AJshmkFD4C1dbXVQ3HAOPXT9ntr3MB+bnxk4ey1yALMu9v5jKblm5+UHNH6aX7dpxF5VCACU8P/TA6BFZGJ/LvnAoQKBgQC9jDAeY5r6A/d4wuxQMF0bxLuXChDUl23isOcu68TKxTTx0IdNUtI6AzBpxw/Qtea608kTKP4IRLwVmajAx5RVjmz92daiPaV56MrRM2x7Xx105sbCvxGZf4YlOU5arL4H3S6BfzMYec/DpbXcF8SE6yJYlZhBa4g5ZyLoh4uoWwKBgQCzokK4A9Lb9+z19ExHcRYfUbZWwTxHmUG4TLUrpDtHtqk4wvY64lX74NphzXwWi2+NZEtxW9Xi+Kx6a6Q7YTriWJqHVCcyJIUwh+rlSsoplNbigbC33BW43+TrlMrddhpsWS9NHIBfkl2gg1cL6qSoFT6HAHkBk+MRpQINoqkQEQKBgQCNeRvVIrziTKGh1cLxmxdziWQGOLIVKq0OnMEAaWLpgUWiEuVZ1i4otIam/LeWLJ545WfX0CnC3CKR8K1erdfN/87jrXqgf2iJ1DHE8R/P+U8QGMtTQa8OJXtnPx13WiU/01tJtjnZ09k5iu5wxqCcIK/y9Dy+31a+mXcZnUmkrwKBgAZfakiG8jMVj5WGLjKWo3dG+dYIEvBjUn6MUh0TPXsk0soNuJiMMQq3hmfT12QhXDrC5R5HaMYdlljder0UjPc8t3a3mJBh1UvMdpvd1GA3RIxSl4deSnL9lmx5Id1LdFKFs3Tj3vYFBkdMgYkNsPu5jTdS3/gbXAHjPbhoHeFRAoGBAK3IfDccROCa82MZvkugCHCkiYBko2b4pFXKvxBq8LzQEvM+C0YR4zz/UBHR7/CyXZo2CbG0Qy2Ltzeu4qCMrDg7rpxF3lsd+aHSlERMFoPdc4mLNom5oSF1SuLwEFkk6zBA2DO5CLO8lfbIVBt/eFtlrsQKpU86BcmY2q+iAeXq\n-----END RSA PRIVATE KEY-----';
      const privateKey = forge.pki.privateKeyFromPem(priKey);

      // encrypt data with a public key using RSAES-OAEP/SHA-256/MGF1-SHA-1
      // compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
      const encrypted = publicKey.encrypt(
        'miguel.garcias@elektra.com.mx',
        'RSA-OAEP',
        ASYMMETRIC_OPTIONS2,
      );
      console.log(window.btoa(encrypted));

      // decrypt data with a private key using RSAES-OAEP/SHA-256/MGF1-SHA-1
      // compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
      const decrypted = privateKey.decrypt(
        window.btoa(encrypted),
        'RSA-OAEP',
        ASYMMETRIC_OPTIONS2,
      );
      console.log(decrypted);
    } catch (e) {
      console.log('encryptRSAOAE: error: ', e);
      return '';
    }
  };*/

  async encryptRSAOAE(
    value: string,
    key: string,
  ) {
    console.log(key);
    try {
      // const normalizedPublicKey = `-----BEGIN PUBLIC KEY----- ${key} -----END PUBLIC KEY-----`;
      const normalizedPublicKey = this._toKeyWithPem(
        key,
        'public',
      );
      console.log(normalizedPublicKey);

      const publicKey = forge.pki.publicKeyFromPem(normalizedPublicKey);
      // const encryptedBytes = publicKey.encrypt(value.toString(), 'RSA-OAEP');
      // return window.btoa(encryptedBytes);
      // let toEncrypt = Buffer.from(value);
      console.log(forge.util.encode64(value));

      // ENCRYPT String
      /*let toEncrypt = Buffer.from(value);
      let encrypted = forge.util.encode64(
        keypair.publicKey.encrypt(toEncrypt, "RSA-OAEP")
      );*/
      const messageDigest = this._md5Digest(value).getBytes();
      console.log(messageDigest);
      const encrypted = publicKey.encrypt(messageDigest, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
          md: forge.md.sha1.create(),
        },
      });
      // console.log(encrypted);
      return forge.util.encode64(encrypted);
      // return window.btoa(encrypted);

      // return forge.util.encode64(publicKey.encrypt(forge.util.hexToBytes(value)));
      // return encrypted;
    } catch (e) {
      console.log('encryptRSAOAE: error: ', e);
      return new Promise<string>((resolve, reject) => {
        resolve(value);
      });
    }
  };

  _md5Digest(byteString) {
    const md = forge.md.md5.create();
    md.update(byteString);

    return md.digest();
  }

  /*async decryptRSAOAE(value, key) {
    try {
      const pKey = '-----BEGIN RSA PRIVATE KEY-----\n' + key + '\n-----END RSA PRIVATE KEY-----';
      const privateKey = forge.pki.privateKeyFromPem(pKey);
      const encryptedBytes = privateKey.decrypt(value, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
          md: forge.md.sha1.create(),
        },
      });
      console.log(encryptedBytes);
      return window.btoa(encryptedBytes);

      // return forge.util.encode64(privateKey.decrypt(forge.util.hexToBytes(value)));

      /!*var privateKey = forge.pki.privateKeyFromPem(rsaPrivateKey.val());
      var ctBytes = forge.util.decode64(value);
      console.log(ctBytes);
      var plaintextBytes = privateKey.decrypt(ctBytes);
      // @ts-ignore
      return plaintextBytes.toString("utf8");*!/
    } catch (e) {
      console.log('decryptRSAOAE: error: ', e);
      return '';
    }
  };*/


  // ----
  public async decryptRSAOAEP(
    value: string,
    key: string,
  ) {
    try {
      // const keys = await this.getSecurityKeys();
      // let prKey = privateKey
      const normalizedPrivateKey = this._toKeyWithPem(
        key,
        'private',
      );
      console.log(normalizedPrivateKey);

      const privateKey = forge.pki.privateKeyFromPem(normalizedPrivateKey);
      var decrypted = privateKey.decrypt(forge.util.decode64(value), 'RSA-OAEP', { // esto es el dato desencriptado
        md: forge.md.sha256.create(),
        mgf1: {
          md: forge.md.sha256.create(),
        },
      });
      // debugger
      return decrypted;
    } catch (error) {
      // debugger
      console.log(error);
      return new Promise<string>((resolve, reject) => {
        resolve(value);
      });
    }
  }

  _toKeyWithPem(key, type) {
    let localKey = key;

    if (!localKey) {
      return localKey;
    }

    if (type === 'public') {
      localKey =
        '-----BEGIN PUBLIC KEY-----\n' + key + '\n-----END PUBLIC KEY-----';
    }

    if (type === 'private') {
      localKey =
        '-----BEGIN PRIVATE KEY-----\n' + key + '\n-----END PRIVATE KEY-----';
    }

    return localKey;
  }

  /*demonstrateKeyBasedAsymmetricEncryption = () => {
    try {
      // replace with yout actual String
      let exampleString =
        "Text that is going to be sent over an insecure channel and must be encrypted at all costs!";
      // generate Keypair, in asynchronous encryption both keys need to be related
      // and cannot be independently generated keys
      // keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
      let keypair = forge.generateKeyPair({ bits: 3072, e: 0x10001 });

      // ENCRYPT String
      let toEncrypt = Buffer.from(exampleString);
      let encrypted = forge.util.encode64(
        keypair.publicKey.encrypt(toEncrypt, "RSA-OAEP")
      );

      // DECRYPT String
      let decrypted = keypair.privateKey.decrypt(
        forge.util.decode64(encrypted),
        "RSA-OAEP"
      );

      console.log(
        "Decrypted String and original String are the same: %s",
        exampleString.localeCompare(decrypted) === 0 ? "yes" : "no"
      );
    } catch (error) {
      console.log(error);
    }
  };*/


  // ----


  async encryptAes(plainText, aesK, hmack) {
    const valueToEncrypt = plainText.replace(/['"]+/g, '');

    let aesKey = Buffer.from(aesK, 'utf8');
    aesKey = Buffer.from(aesK, 'base64');

    // let aesHmac = Buffer.from(hmack, 'utf8');
    // // @ts-ignore
    // aesHmac = Buffer.from(aesHmac, 'base64');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(await this.getAlgorithm(aesKey), aesKey, iv);

    let cipherText = Buffer.concat([cipher.update(Buffer.from(valueToEncrypt, 'utf8')), cipher.final()]);
    const ivCipherText = Buffer.concat([iv, cipherText]);
    const hmac = crypto.createHmac('SHA256', Buffer.from(hmack, 'base64')).update(ivCipherText).digest();
    const ivCipherTextHmac = Buffer.concat([ivCipherText, hmac]);

    return ivCipherTextHmac.toString('base64');
  }

  async decryptAes(encryptedValue: string, aesK: string, hmacK: string) {
    const ivCipherTextHmac = Buffer.from(encryptedValue, 'base64');
    const aesKey = Buffer.from(aesK, 'base64');
    const hmacKey = Buffer.from(hmacK, 'utf8');
    const macLength = crypto.createHmac('sha256', hmacKey).digest().length;

    const cipherTextLength = ivCipherTextHmac.length - macLength;
    const iv = ivCipherTextHmac.slice(0, 16);
    const cipherText = ivCipherTextHmac.slice(16, cipherTextLength);
    const decipher = crypto.createDecipheriv(await this.getAlgorithm(aesKey), aesKey, iv);

    let decrypted = decipher.update(cipherText);
    // @ts-ignore
    decrypted += decipher.final();

    return decrypted.toString();
  }

  async getAlgorithm(keyBase64: any) {
    const key = Buffer.from(keyBase64, 'base64');
    switch (key.length) {
      case 16:
        return 'aes-128-cbc';
      case 32:
        return 'aes-256-cbc';
    }
    throw new Error('getAlgorithm: Invalid key length: ' + key.length);
  }

}
