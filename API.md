# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CloudCostManager <a name="CloudCostManager" id="iac-testing.CloudCostManager"></a>

- *Implements:* aws-cdk-lib.IAspect

#### Initializers <a name="Initializers" id="iac-testing.CloudCostManager.Initializer"></a>

```typescript
import { CloudCostManager } from 'iac-testing'

new CloudCostManager(scope: Construct, id: string, props: CloudCostManagerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#iac-testing.CloudCostManager.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#iac-testing.CloudCostManager.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#iac-testing.CloudCostManager.Initializer.parameter.props">props</a></code> | <code><a href="#iac-testing.CloudCostManagerProps">CloudCostManagerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="iac-testing.CloudCostManager.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="iac-testing.CloudCostManager.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="iac-testing.CloudCostManager.Initializer.parameter.props"></a>

- *Type:* <a href="#iac-testing.CloudCostManagerProps">CloudCostManagerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#iac-testing.CloudCostManager.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#iac-testing.CloudCostManager.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `toString` <a name="toString" id="iac-testing.CloudCostManager.toString"></a>

```typescript
public toString()
```

Returns a string representation of this construct.

##### `visit` <a name="visit" id="iac-testing.CloudCostManager.visit"></a>

```typescript
public visit(node: IConstruct)
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="iac-testing.CloudCostManager.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#iac-testing.CloudCostManager.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="iac-testing.CloudCostManager.isConstruct"></a>

```typescript
import { CloudCostManager } from 'iac-testing'

CloudCostManager.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="iac-testing.CloudCostManager.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#iac-testing.CloudCostManager.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#iac-testing.CloudCostManager.property.props">props</a></code> | <code><a href="#iac-testing.CloudCostManagerProps">CloudCostManagerProps</a></code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="iac-testing.CloudCostManager.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `props`<sup>Required</sup> <a name="props" id="iac-testing.CloudCostManager.property.props"></a>

```typescript
public readonly props: CloudCostManagerProps;
```

- *Type:* <a href="#iac-testing.CloudCostManagerProps">CloudCostManagerProps</a>

---


## Structs <a name="Structs" id="Structs"></a>

### CloudCostManagerProps <a name="CloudCostManagerProps" id="iac-testing.CloudCostManagerProps"></a>

#### Initializer <a name="Initializer" id="iac-testing.CloudCostManagerProps.Initializer"></a>

```typescript
import { CloudCostManagerProps } from 'iac-testing'

const cloudCostManagerProps: CloudCostManagerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#iac-testing.CloudCostManagerProps.property.customerName">customerName</a></code> | <code>string</code> | The name of the customer that the stack is for. |
| <code><a href="#iac-testing.CloudCostManagerProps.property.envName">envName</a></code> | <code>string</code> | The name of the environment. |

---

##### `customerName`<sup>Required</sup> <a name="customerName" id="iac-testing.CloudCostManagerProps.property.customerName"></a>

```typescript
public readonly customerName: string;
```

- *Type:* string

The name of the customer that the stack is for.

e.g. ```'acme-co'```

---

##### `envName`<sup>Required</sup> <a name="envName" id="iac-testing.CloudCostManagerProps.property.envName"></a>

```typescript
public readonly envName: string;
```

- *Type:* string

The name of the environment.

e.g. ```'production'```

---



