{{#each results}}
       <li class="card"><a href="/expedition/{{slug}}?{{../q}}"></a>

        <div class="container-yachtcard-img">
            {{#if [message/offers]}}
              <span class="label">
              {{[message/offers]}}
              </span>
            {{/if}}
            {{#if thumbnail.filename}}
              <img src="/uploads/images/expedition/thumbnails/{{thumbnail.filename}}" alt={{thumbnail.filename}}/>
            {{else}} 
              <img src="/images/sprite/placeholder.png" alt="placeholder"/>
            {{/if}}
        </div>
        <h3 class="yacht-name">
            {{#if name}}
              {{name}}
            {{else}}
              = "missing"
            {{/if}} 
        </h3>
        <ul class="yacht-specs">
          <li><span>Price</span>{{{numeral price currency}}}
          </li>
        </ul>
      </li>
{{/each}}