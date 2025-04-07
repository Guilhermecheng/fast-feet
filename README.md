# Regras da aplicação

- [x] A aplicação deve ter dois tipos de usuário, entregador e/ou admin;
- [ ] Deve ser possível realizar login com CPF e Senha;
- [ ] Deve ser possível realizar o CRUD dos entregadores;
- [ ] Deve ser possível realizar o CRUD das encomendas;
- [ ] Deve ser possível realizar o CRUD dos destinatários;
- [ ] Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada);
- [ ] Deve ser possível retirar uma encomenda;
- [ ] Deve ser possível marcar uma encomenda como entregue;
- [ ] Deve ser possível marcar uma encomenda como devolvida;
- [ ] Deve ser possível listar as encomendas com endereços de entrega próximo ao local do entregador;
- [ ] Deve ser possível alterar a senha de um usuário;
- [ ] Deve ser possível listar as entregas de um usuário;
- [ ] Deve ser possível notificar o destinatário a cada alteração no status da encomenda;

## CRUDS

### Entregadores
- [x] Create
- [x] Read
- [ ] Update 
- [ ] Delete

### Encomendas
- [x] Create
- [x] Read
- [ ] Update
- [x] Delete

### Destinatários
- [ ] Create
- [ ] Read
- [ ] Update
- [ ] Delete

# Regras de negócio

- [ ] Somente usuário do tipo admin pode realizar operações de CRUD nas encomendas;
- [ ] Somente usuário do tipo admin pode realizar operações de CRUD dos entregadores;
- [ ] Somente usuário do tipo admin pode realizar operações de CRUD dos destinatários;
- [ ] Para marcar uma encomenda como entregue é obrigatório o envio de uma foto;
- [ ] Somente o entregador que retirou a encomenda pode marcar ela como entregue;
- [ ] Somente o admin pode alterar a senha de um usuário;
- [ ] Não deve ser possível um entregador listar as encomendas de outro entregador;

## Conceitos que pode praticar

- DDD, Domain Events, Clean Architecture
- Autenticação e Autorização (RBAC)
- Testes unitários e e2e
- Integração com serviços externos

# Entities

- User
- Delivery Orders
- Destinatários

# Organização das pastas

Para uma melhor separação das camadas, seguindo os princípios do SOLID e Clean Achitecture, seguirei a seguinte organização de pastas:

```
├─ core
│ ├─ common entitites, errors & types
│
├─ domain
│ ├─ delivery-control (sub domain)
│ │ ├─ enterprise (Entities)
│ │ │ ├─ entities
│ │ │
│ │ ├─ application (Use cases)
│ │ │ ├─ use-cases
│ │ │ ├─ repositories
```

### Clean Architecture

![image](https://github.com/user-attachments/assets/11bed646-fd74-42e0-99bf-4ba7ba939858)
