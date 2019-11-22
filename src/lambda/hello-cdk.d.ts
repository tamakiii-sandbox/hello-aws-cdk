export interface User {
    name: string;
}
export interface GreetingMessage {
    title: string;
    description: string;
}
export declare function handler(event: User): Promise<GreetingMessage>;
export declare class HelloWorldUseCase {
    static hello(userInfo: User): Promise<GreetingMessage>;
    private static createMessage;
}
export declare class DynamodbGreetingTable {
    static greetingStore(greeting: GreetingMessage): Promise<void>;
}
