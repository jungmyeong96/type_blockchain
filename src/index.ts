import crypto from "crypto";

// npm i -D ts-node 빌드 없이 타입스크립트를 실행가능
// 프로덕션은 사용하지않고 개발환경에서 사용 빌드없이 빠르게 새로고침하고 싶을때 사용
// 빌드한 다음에 코드를 실행하지 않아도 ts-node가 컴파일할 필요없이 타입스크립트 코드를 대신 실행해줌
// npm i nodemon
// 자동으로 커맨드를 실행해줘서 코드가 수정되어도 서버를 재실행할 필요없음.

// blockchain은 데이터를 블록에 담아 체인형태로 연결하여 수 많은 컴퓨터에 복제하여 데이터를 저장하는 방식
// 블록에는 데이터가 들어있음.
// 블록은 블록끼리 연결되어 있는데 그 체인은 해쉬로 구성되어있음.
// npm i -D @types/node //nodeJS를 위한 타입을 설치

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public readonly hash: string;
  constructor(
    public readonly prevHash: string,
    public readonly height: number,
    public readonly data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    else return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }
  public getBlocks(): Block[] {
    return [...this.blocks]; //복사해서 리턴하지 않고 기존 주소를 보내면 보안에 문제가 생김 아래 처럼 해킹가능하다
  }
}

const blockchain = new Blockchain();

blockchain.getBlocks().push(new Block("xxxx", 12312, "HACKEDDD"));

blockchain.addBlock("First one");
blockchain.addBlock("second one");
blockchain.addBlock("third one");
console.log(blockchain.getBlocks());
