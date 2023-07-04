import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { DemoClient as _demoPackage_DemoClient, DemoDefinition as _demoPackage_DemoDefinition } from './demoPackage/Demo';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  demoPackage: {
    BidirectionalStreamRequest: MessageTypeDefinition
    BidirectionalStreamResponse: MessageTypeDefinition
    Demo: SubtypeConstructor<typeof grpc.Client, _demoPackage_DemoClient> & { service: _demoPackage_DemoDefinition }
    RegularRequest: MessageTypeDefinition
    RegularResponse: MessageTypeDefinition
    StreamFromClientRequest: MessageTypeDefinition
    StreamFromClientResponse: MessageTypeDefinition
    StreamFromServerResponse: MessageTypeDefinition
  }
  google: {
    protobuf: {
      Any: MessageTypeDefinition
    }
  }
}

