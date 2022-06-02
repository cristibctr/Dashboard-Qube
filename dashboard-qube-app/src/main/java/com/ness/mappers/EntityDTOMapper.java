package com.ness.mappers;

public interface EntityDTOMapper<S, T> {
    public S mapToDTO(T t);
    public T mapDTOTo(S s);
}
