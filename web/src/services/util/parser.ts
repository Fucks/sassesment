export interface ParserAdapter<T, S> {
    serializeTo(model: T): S;
    serializeFrom(entity: S): T;
}