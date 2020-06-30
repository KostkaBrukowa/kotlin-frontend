interface SnapshotOptions {
  customSnapshotsDir?: string;
  customDiffDir?: string;
}

interface MockGraphQLOptions<AllOperations extends Record<string, any>> {
  schema: string | string[] | IntrospectionQuery;
  name?: string;
  mocks?: IMocks;
  endpoint?: string;
  operations?: Partial<AllOperations>;
  /* Global Delay for stubbed responses (in ms) */
  delay?: number;
}

interface SetOperationsOpts<AllOperations> {
  name?: string;
  endpoint?: string;
  /* Operations object. Make sure that mocks must not be wrapped with `data` property */
  operations?: Partial<AllOperations>;
  /* Delay for stubbed responses (in ms) */
  delay?: number;
}

interface GQLRequestPayload<AllOperations extends Record<string, any>> {
  operationName: Extract<keyof AllOperations, string>;
  query: string;
  variables: any;
}

declare namespace Cypress {
  interface FixtureData {
    filePath: string;
    fileContent?: Blob;
    fileName?: string;
    encoding?: string;
    mimeType?: string;
  }

  interface FileProcessingOptions {
    subjectType?: 'input' | 'drag-n-drop';
    force?: boolean;
    allowEmpty?: boolean;
  }

  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    getCy(value: string): Chainable<Element>;
    login(): null;
    register(): null;
    graphqlSpy(): null;
    expectQueryName(queryName: string): null;
    waitAndExpectQueryName(queryName: string): null;

    matchImageSnapshot(options?: string | SnapshotOptions): Chainable<Element>;
    matchImageSnapshot(name: string, options: SnapshotOptions): Chainable<Element>;

    /**
     * Command to attach file(s) to given HTML element as subject
     * @param fixture file to attach
     * @param processingOpts affects the way of fixture processing
     */
    attachFile(
      fixture: string | FixtureData,
      processingOpts?: FileProcessingOptions,
    ): Chainable<Subject>;

    mockGraphql<AllOperations = any>(
      options?: MockGraphQLOptions<AllOperations>,
    ): Cypress.Chainable;
    mockGraphqlOps<AllOperations = any>(
      options?: SetOperationsOpts<AllOperations>,
    ): Cypress.Chainable;
  }
}
