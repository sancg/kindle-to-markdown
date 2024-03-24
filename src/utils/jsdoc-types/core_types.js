/**
 * Represent the JSON format of the extracted Notes
 * @typedef {{
 *  title: string;
 *  author?: string;
 *  reference: string;
 *  highlight?: string;
 *  note?: string;
 * }} ExtractedNote
 *
 * Represent a Book collection after it was grouped
 * @typedef {{
 *      book: string;
 *      annotations: {
 *        reference: string;
 *        highlight?: string | null;
 *        note?: string | null;
 *      }[]
 *    }
 * } BookA
 *
 * Represent the format of a JSON result
 * @typedef {{
 *    lastEntry: ExtractedNote;
 *    totalBooks: number;
 *    highlightCount: number;
 *  }
 * } NoteResults
 */
