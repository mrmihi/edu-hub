ports=(2000  2001  2002  2003  2004  2005 2006 2007 2008 2009 2010 2011 2012 3000 2013 2014 2011 2012);
for port in \"${ports[@]}\"; do 
    pnpm exec kill-port "${port//\"}";
done