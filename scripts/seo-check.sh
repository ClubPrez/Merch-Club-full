#!/usr/bin/env bash
# seo-check.sh — post-deploy SEO status checker for merchclub.com
#
# Usage:
#   ./scripts/seo-check.sh                          # tests https://merchclub.com
#   ./scripts/seo-check.sh https://preview.vercel.app
#
# Must be run against the deployed Vercel URL, not the local dev server.
# vercel.json redirect/410 rules only apply on Vercel, not locally.

set -u
BASE="${1:-https://merchclub.com}"
pass=0; fail=0

chk() {
  local path="$1" expect="$2"
  local res code redir
  res=$(curl -s -o /dev/null -w "%{http_code}|%{redirect_url}" "$BASE$path")
  code="${res%%|*}"
  redir="${res#*|}"
  if [ "$code" = "$expect" ]; then
    printf "  OK    %-52s %s" "$path" "$code"
    [ -n "$redir" ] && printf "  -> %s" "$redir"
    printf "\n"
    pass=$((pass+1))
  else
    printf "  FAIL  %-52s got %s want %s" "$path" "$code" "$expect"
    [ -n "$redir" ] && printf "  -> %s" "$redir"
    printf "\n"
    fail=$((fail+1))
  fi
}

echo "Testing $BASE"
echo

echo "== 200 OK (canonical live pages) =="
for p in \
  / /about /services /contact \
  /blog /blog/branded-merchandise-mistakes /blog/merch-program-strategy \
  /industries /industries/healthcare /industries/construction /industries/corporate /industries/events \
  /case-studies /case-studies/access-bank /case-studies/construction /case-studies/events \
  /case-studies/jay-moore-landscaping /case-studies/nurse-gifting \
  /tools/size-breakdown \
  /privacy-policy /terms /accessibility \
  /sitemap.xml /robots.txt
do
  chk "$p" 200
done

echo
echo "== 301 Redirects =="
# /gallery and /latest-catalogs are legacy WordPress URLs — they redirect to current pages.
# They are NOT real pages on the current site and are not in the sitemap.
chk "/home"                           301   # -> /
chk "/home/"                          301   # -> /
chk "/contact/"                       301   # -> /contact
chk "/gallery"                        301   # -> /case-studies
chk "/gallery/"                       301   # -> /case-studies
chk "/latest-catalogs"                301   # -> /services
chk "/latest-catalogs/"               301   # -> /services
chk "/product/nfc-tap-tee/"           301   # -> /services
chk "/product/tackle-knit/"           301   # -> /services
chk "/product-category/custom-shirts/" 301  # -> /services

echo
echo "== 410 Gone (legacy WordPress/WooCommerce URLs) =="
chk "/wp-content/"                                              410
chk "/wp-content/uploads/test.jpg"                             410
chk "/wp-admin/admin-ajax.php"                                 410
chk "/wp-includes/js/wp-emoji-release.min.js?ver=6.9.4"       410
chk "/author/engrzeb/"                                         410
chk "/feed/"                                                   410
chk "/comments/feed/"                                          410
chk "/product/nailheads-print-tshirt/feed/"                   410
chk "/product-category/custom-shirts/page/3/"                  410
chk "/product-category/emblem/page/3/"                         410
chk "/locations.kml"                                           410

echo
echo "== 404 Not Found (unknown slugs — no broad catch-all for these) =="
chk "/product/random-test-url/"       404   # unknown product slug, not in redirect map
chk "/product-category/unknown-cat/"  404   # unknown category, not in redirect map

echo
echo "Passed: $pass  Failed: $fail"
[ "$fail" -eq 0 ] && exit 0 || exit 1
