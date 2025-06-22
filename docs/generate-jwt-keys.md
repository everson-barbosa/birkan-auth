# Gerar chave privada
```openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048```

# Gerar chave pública (a partir da chave privada)
```openssl rsa -pubout -in private.key -out public.key```

# Converter a chave privada para base64
```base64 private.key > private.key.base64```

# Converter a chave pública para base64
```base64 public.key > public.key.base64```