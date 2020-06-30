interface SnapshotOptions {
  customSnapshotsDir?: string;
  customDiffDir?: string;
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
    getCy(
      value: string,
      options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
    ): Chainable<Element>;

    login(): null;
    register(): null;

    graphqlSpy(): null;
    gqlRoute(options?: Partial<RouteOptions>): Chainable<null>;
    gqlRoute(fixture: string): Chainable<null>;
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
  }
}
