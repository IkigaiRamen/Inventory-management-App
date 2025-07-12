package com.strachange.stokkia.config;

public class ApiResponse<T> {
    private String message;
    private T data;

    public ApiResponse(T data, String message) {
        this.data = data;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}