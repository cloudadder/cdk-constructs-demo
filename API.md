# API Reference <a name="API Reference" id="api-reference"></a>


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

## Classes <a name="Classes" id="Classes"></a>

### CloudCostManager <a name="CloudCostManager" id="iac-testing.CloudCostManager"></a>

- *Implements:* aws-cdk-lib.IAspect

#### Initializers <a name="Initializers" id="iac-testing.CloudCostManager.Initializer"></a>

```typescript
import { CloudCostManager } from 'iac-testing'

new CloudCostManager(stack: Stack, props: CloudCostManagerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#iac-testing.CloudCostManager.Initializer.parameter.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | *No description.* |
| <code><a href="#iac-testing.CloudCostManager.Initializer.parameter.props">props</a></code> | <code><a href="#iac-testing.CloudCostManagerProps">CloudCostManagerProps</a></code> | *No description.* |

---

##### `stack`<sup>Required</sup> <a name="stack" id="iac-testing.CloudCostManager.Initializer.parameter.stack"></a>

- *Type:* aws-cdk-lib.Stack

---

##### `props`<sup>Required</sup> <a name="props" id="iac-testing.CloudCostManager.Initializer.parameter.props"></a>

- *Type:* <a href="#iac-testing.CloudCostManagerProps">CloudCostManagerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#iac-testing.CloudCostManager.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="iac-testing.CloudCostManager.visit"></a>

```typescript
public visit(node: IConstruct)
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="iac-testing.CloudCostManager.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---





