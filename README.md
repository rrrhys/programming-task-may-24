# Getting Started:

Run `yarn` to install node_module dependencies.

Run `yarn start <filename>` to process access logs. E.g. `yarn start input/programming-task-example-data.log`

Run `yarn test` to run unit tests.

Tested on MacOS/node 16, 18.

# Assumptions/notables:

- There was not a clear URL with the most hits. I have proceeded with using a descending sort & using top 3, since a real file would have clear top entries.
- Assumed that relative and absolute URLs are part of the same domain. `normalizeUrl` could be modified to separate them again.
- Media requests (e.g. CSS) and non-200 responses (e.g. 404) have been treated as hits. We could easily filter to 200's if needed.
- I used a stream so in the case of reading very large files/low memory server the code could be adapted quickly.
- If we know we would never ever need the file contents for anything else, we could build the metrics while loading instead of tallying them later.

# Sample output:

```
{
  File: '/Users/rhys/Projects/programming-task-may-24/input/programming-task-example-data.log',
  'Top IPs': [ '168.41.191.40', '177.71.128.21', '50.112.00.11' ],
  'Top 3 URLs': [ '/faq/', '/docs/manage-websites/', '/intranet-analytics/' ],
  'Unique IPs Count': 11
}
```
