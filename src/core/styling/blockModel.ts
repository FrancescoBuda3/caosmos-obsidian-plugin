/**
 * represents a first-level block of a document
 */
export interface RawBlock {
    /** Progressive index of the block in the document */
    index: number;

    /** The block kind as interpreted by the markdown parser */
    kind: BlockKind;

    /** The raw text content of the block */
    text: string;
}

export type BlockKind =
    | 'heading'
    | 'paragraph'
    | 'code'
    | 'blockquote'
    | 'list'
    | 'other'


/** a semantic role assigned to a block */
export type BlockRole =
    | 'title'
    | 'content'
    | 'links' ;