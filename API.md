# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### CloudCostManagerProps <a name="CloudCostManagerProps" id="@cloudadder/cdk-constructs-demo.CloudCostManagerProps"></a>

#### Initializer <a name="Initializer" id="@cloudadder/cdk-constructs-demo.CloudCostManagerProps.Initializer"></a>

```typescript
import { CloudCostManagerProps } from '@cloudadder/cdk-constructs-demo'

const cloudCostManagerProps: CloudCostManagerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudadder/cdk-constructs-demo.CloudCostManagerProps.property.customerName">customerName</a></code> | <code>string</code> | The name of the customer that the stack is for. |
| <code><a href="#@cloudadder/cdk-constructs-demo.CloudCostManagerProps.property.envName">envName</a></code> | <code>string</code> | The name of the environment. |

---

##### `customerName`<sup>Required</sup> <a name="customerName" id="@cloudadder/cdk-constructs-demo.CloudCostManagerProps.property.customerName"></a>

```typescript
public readonly customerName: string;
```

- *Type:* string

The name of the customer that the stack is for.

e.g. ```'acme-co'```

---

##### `envName`<sup>Required</sup> <a name="envName" id="@cloudadder/cdk-constructs-demo.CloudCostManagerProps.property.envName"></a>

```typescript
public readonly envName: string;
```

- *Type:* string

The name of the environment.

e.g. ```'production'```

---

## Classes <a name="Classes" id="Classes"></a>

### CloudCostManager <a name="CloudCostManager" id="@cloudadder/cdk-constructs-demo.CloudCostManager"></a>

- *Implements:* aws-cdk-lib.IAspect

#### Initializers <a name="Initializers" id="@cloudadder/cdk-constructs-demo.CloudCostManager.Initializer"></a>

```typescript
import { CloudCostManager } from '@cloudadder/cdk-constructs-demo'

new CloudCostManager(stack: Stack, props: CloudCostManagerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudadder/cdk-constructs-demo.CloudCostManager.Initializer.parameter.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | *No description.* |
| <code><a href="#@cloudadder/cdk-constructs-demo.CloudCostManager.Initializer.parameter.props">props</a></code> | <code><a href="#@cloudadder/cdk-constructs-demo.CloudCostManagerProps">CloudCostManagerProps</a></code> | *No description.* |

---

##### `stack`<sup>Required</sup> <a name="stack" id="@cloudadder/cdk-constructs-demo.CloudCostManager.Initializer.parameter.stack"></a>

- *Type:* aws-cdk-lib.Stack

---

##### `props`<sup>Required</sup> <a name="props" id="@cloudadder/cdk-constructs-demo.CloudCostManager.Initializer.parameter.props"></a>

- *Type:* <a href="#@cloudadder/cdk-constructs-demo.CloudCostManagerProps">CloudCostManagerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudadder/cdk-constructs-demo.CloudCostManager.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="@cloudadder/cdk-constructs-demo.CloudCostManager.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="@cloudadder/cdk-constructs-demo.CloudCostManager.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---





