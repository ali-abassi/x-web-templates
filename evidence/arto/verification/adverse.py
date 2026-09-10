from browser import *
import re
OUT=E/'final';rows=[]
def ref(label,role='button'):
 s=snap();m=re.search(r'\b'+role+r' "'+re.escape(label)+r'"[^\n]*ref=(e\d+)',s);assert m,label;return '@'+m.group(1)
def click(label,role='button'):
 run('click',ref(label,role));snap()
def fill(label,value,role='textbox'):
 run('fill',ref(label,role),value);snap()
def check(name,expr):
 v=js(expr);rows.append({'case':name,'passed':bool(v),'observed':v});(OUT/'adverse.json').write_text(json.dumps(rows,indent=2));assert v,name
visit('arto',320,'final')
fill('Search transactions','Z'*100,'searchbox');check('maximum search empty fits','document.querySelector("#search").value.length===100 && !document.querySelector("#empty").hidden && document.documentElement.scrollWidth===320');fill('Search transactions','','searchbox')
click('Set Budget Create a sample budget');fill('Budget name','Long budget '+ 'X'*68);fill('Amount in USD','100000.01','spinbutton');click('Save sample budget');check('above max rejected','!document.querySelector("#action-amount").validity.valid && document.querySelector("#action-result").textContent===""');fill('Amount in USD','1.001','spinbutton');click('Save sample budget');check('fractional cent rejected','document.querySelector("#action-amount").validity.stepMismatch');fill('Amount in USD','100000','spinbutton');click('Save sample budget');check('maximum input result wraps','document.querySelector("#action-result").textContent.includes("$100,000.00") && document.querySelector("#action-dialog").scrollWidth===document.querySelector("#action-dialog").clientWidth');run('screenshot',str(OUT/'maximum-budget-320.png'));run('press','Escape');snap();click('Budgets','link');check('long budget review wraps','document.querySelector("#detail-title").textContent.length===80 && document.querySelector("#detail-dialog").scrollWidth===document.querySelector("#detail-dialog").clientWidth');run('screenshot',str(OUT/'long-budget-320.png'));run('press','Escape');snap()
click('Add Income Log a sample income');fill('Income description','<img src=x onerror=alert(1)>');fill('Amount in USD','0.01','spinbutton');click('Add sample income');run('press','Escape');snap();check('minimum income and literal text safe','document.querySelector("[data-amount=balance]").textContent==="$3,908.01" && document.querySelector("#transaction-rows").textContent.includes("<img src=x") && document.querySelectorAll("#transaction-rows img").length===0')
js('document.querySelector(".mountains").src="assets/qa-missing.png"');snap();run('wait','150');check('art failure preserves ledger','document.querySelector(".mountains").hidden && document.querySelector("#art-status").textContent.includes("unavailable") && document.querySelector("[data-amount=balance]").textContent==="$3,908.01"');run('screenshot',str(OUT/'missing-art-320.png'));click('Details for <img src=x onerror=alert(1)>');check('details after art failure','document.querySelector("#detail-dialog").open && document.querySelector("#detail-title").textContent.includes("<img src=x")');run('press','Escape');snap()
run('open','http://127.0.0.1:4173/arto/');snap();run('webmcp','list');run('wait','100');check('reload restores original sample','document.querySelector("[data-amount=balance]").textContent==="$3,908.00" && !document.querySelector("#transaction-rows").textContent.includes("<img src=x")')
# Sidebar keyboard names and focus stay usable when icons replace labels.
run('focus',ref('Settings','link'));snap();run('press','Enter');snap();check('mobile keyboard settings','document.querySelector("#detail-dialog").open');run('press','Escape');snap();check('mobile keyboard focus restored','document.activeElement.textContent.trim()==="Settings"')
print(f'{len(rows)} adverse checks passed')
