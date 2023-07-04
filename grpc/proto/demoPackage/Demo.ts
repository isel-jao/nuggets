// Original file: proto/demo.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { BidirectionalStreamRequest as _demoPackage_BidirectionalStreamRequest, BidirectionalStreamRequest__Output as _demoPackage_BidirectionalStreamRequest__Output } from '../demoPackage/BidirectionalStreamRequest';
import type { BidirectionalStreamResponse as _demoPackage_BidirectionalStreamResponse, BidirectionalStreamResponse__Output as _demoPackage_BidirectionalStreamResponse__Output } from '../demoPackage/BidirectionalStreamResponse';
import type { RegularRequest as _demoPackage_RegularRequest, RegularRequest__Output as _demoPackage_RegularRequest__Output } from '../demoPackage/RegularRequest';
import type { RegularResponse as _demoPackage_RegularResponse, RegularResponse__Output as _demoPackage_RegularResponse__Output } from '../demoPackage/RegularResponse';
import type { StreamFromClientRequest as _demoPackage_StreamFromClientRequest, StreamFromClientRequest__Output as _demoPackage_StreamFromClientRequest__Output } from '../demoPackage/StreamFromClientRequest';
import type { StreamFromClientResponse as _demoPackage_StreamFromClientResponse, StreamFromClientResponse__Output as _demoPackage_StreamFromClientResponse__Output } from '../demoPackage/StreamFromClientResponse';
import type { StreamFromServerResponse as _demoPackage_StreamFromServerResponse, StreamFromServerResponse__Output as _demoPackage_StreamFromServerResponse__Output } from '../demoPackage/StreamFromServerResponse';

export interface DemoClient extends grpc.Client {
  BidirectionalStream(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_demoPackage_BidirectionalStreamRequest, _demoPackage_BidirectionalStreamResponse__Output>;
  BidirectionalStream(options?: grpc.CallOptions): grpc.ClientDuplexStream<_demoPackage_BidirectionalStreamRequest, _demoPackage_BidirectionalStreamResponse__Output>;
  bidirectionalStream(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_demoPackage_BidirectionalStreamRequest, _demoPackage_BidirectionalStreamResponse__Output>;
  bidirectionalStream(options?: grpc.CallOptions): grpc.ClientDuplexStream<_demoPackage_BidirectionalStreamRequest, _demoPackage_BidirectionalStreamResponse__Output>;
  
  RegularMethod(argument: _demoPackage_RegularRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_demoPackage_RegularResponse__Output>): grpc.ClientUnaryCall;
  RegularMethod(argument: _demoPackage_RegularRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_demoPackage_RegularResponse__Output>): grpc.ClientUnaryCall;
  RegularMethod(argument: _demoPackage_RegularRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_demoPackage_RegularResponse__Output>): grpc.ClientUnaryCall;
  RegularMethod(argument: _demoPackage_RegularRequest, callback: grpc.requestCallback<_demoPackage_RegularResponse__Output>): grpc.ClientUnaryCall;
  regularMethod(argument: _demoPackage_RegularRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_demoPackage_RegularResponse__Output>): grpc.ClientUnaryCall;
  regularMethod(argument: _demoPackage_RegularRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_demoPackage_RegularResponse__Output>): grpc.ClientUnaryCall;
  regularMethod(argument: _demoPackage_RegularRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_demoPackage_RegularResponse__Output>): grpc.ClientUnaryCall;
  regularMethod(argument: _demoPackage_RegularRequest, callback: grpc.requestCallback<_demoPackage_RegularResponse__Output>): grpc.ClientUnaryCall;
  
  StreamFromClient(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_demoPackage_StreamFromClientResponse__Output>): grpc.ClientWritableStream<_demoPackage_StreamFromClientRequest>;
  StreamFromClient(metadata: grpc.Metadata, callback: grpc.requestCallback<_demoPackage_StreamFromClientResponse__Output>): grpc.ClientWritableStream<_demoPackage_StreamFromClientRequest>;
  StreamFromClient(options: grpc.CallOptions, callback: grpc.requestCallback<_demoPackage_StreamFromClientResponse__Output>): grpc.ClientWritableStream<_demoPackage_StreamFromClientRequest>;
  StreamFromClient(callback: grpc.requestCallback<_demoPackage_StreamFromClientResponse__Output>): grpc.ClientWritableStream<_demoPackage_StreamFromClientRequest>;
  streamFromClient(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_demoPackage_StreamFromClientResponse__Output>): grpc.ClientWritableStream<_demoPackage_StreamFromClientRequest>;
  streamFromClient(metadata: grpc.Metadata, callback: grpc.requestCallback<_demoPackage_StreamFromClientResponse__Output>): grpc.ClientWritableStream<_demoPackage_StreamFromClientRequest>;
  streamFromClient(options: grpc.CallOptions, callback: grpc.requestCallback<_demoPackage_StreamFromClientResponse__Output>): grpc.ClientWritableStream<_demoPackage_StreamFromClientRequest>;
  streamFromClient(callback: grpc.requestCallback<_demoPackage_StreamFromClientResponse__Output>): grpc.ClientWritableStream<_demoPackage_StreamFromClientRequest>;
  
  StreamFromServer(argument: _demoPackage_RegularRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_demoPackage_StreamFromServerResponse__Output>;
  StreamFromServer(argument: _demoPackage_RegularRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_demoPackage_StreamFromServerResponse__Output>;
  streamFromServer(argument: _demoPackage_RegularRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_demoPackage_StreamFromServerResponse__Output>;
  streamFromServer(argument: _demoPackage_RegularRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_demoPackage_StreamFromServerResponse__Output>;
  
}

export interface DemoHandlers extends grpc.UntypedServiceImplementation {
  BidirectionalStream: grpc.handleBidiStreamingCall<_demoPackage_BidirectionalStreamRequest__Output, _demoPackage_BidirectionalStreamResponse>;
  
  RegularMethod: grpc.handleUnaryCall<_demoPackage_RegularRequest__Output, _demoPackage_RegularResponse>;
  
  StreamFromClient: grpc.handleClientStreamingCall<_demoPackage_StreamFromClientRequest__Output, _demoPackage_StreamFromClientResponse>;
  
  StreamFromServer: grpc.handleServerStreamingCall<_demoPackage_RegularRequest__Output, _demoPackage_StreamFromServerResponse>;
  
}

export interface DemoDefinition extends grpc.ServiceDefinition {
  BidirectionalStream: MethodDefinition<_demoPackage_BidirectionalStreamRequest, _demoPackage_BidirectionalStreamResponse, _demoPackage_BidirectionalStreamRequest__Output, _demoPackage_BidirectionalStreamResponse__Output>
  RegularMethod: MethodDefinition<_demoPackage_RegularRequest, _demoPackage_RegularResponse, _demoPackage_RegularRequest__Output, _demoPackage_RegularResponse__Output>
  StreamFromClient: MethodDefinition<_demoPackage_StreamFromClientRequest, _demoPackage_StreamFromClientResponse, _demoPackage_StreamFromClientRequest__Output, _demoPackage_StreamFromClientResponse__Output>
  StreamFromServer: MethodDefinition<_demoPackage_RegularRequest, _demoPackage_StreamFromServerResponse, _demoPackage_RegularRequest__Output, _demoPackage_StreamFromServerResponse__Output>
}
