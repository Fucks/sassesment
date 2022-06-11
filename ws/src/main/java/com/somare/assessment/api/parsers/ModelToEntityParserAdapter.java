package com.somare.assessment.api.parsers;

public interface ModelToEntityParserAdapter<T, S> {

    T serializeToEntity(S model);

    S serializeToModel(T entity);

}
